import {Request, Response,Router ,NextFunction} from 'express';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import { User } from '../entities/User';
import Post from '../entities/Post';
import Vote from '../entities/Vote';
import Comments from '../entities/Comment';


const vote = async (req : Request, res : Response) => { 
    const { identifier, slug, commentIdentifier, value } = req.body;

    //  -1 0 1 의 value만 오는지 체크
    if(![-1, 0, 1].includes(value)) {
        return res.status(400).json({value : '-1, 0, 1의 value만 올 수 있습니다.'})
    }

    try {
        const user : User = res.locals.user;
        console.log('user입니다.', user)
        let post : Post = await Post.findOneByOrFail({identifier, slug});
        let vote : Vote = undefined;
        let comment : Comments;
        if(commentIdentifier) {
            //댓글 식별자가 있는 경우 댓글로 vote 찾기
            comment = await Comments.findOneByOrFail({identifier : commentIdentifier});
            vote = await Vote.findOneBy({username : user.username , commentId : comment.id})
        } else {
            // post로 찾기
            vote = await Vote.findOneBy({username : user.username, postId : post.id})
        }

        if(!vote && value === 0) {
            // 이미 한번은 좋아요나 싫어요를 누른상태에서 0이 api로옴
            // vote 없고 value 가 0인 경우 에러 반환
            return res.status(404).json({error:'Vote를 찾을 수 없습니다.'});
        } else if (!vote) {
            // vote만 없을때? 0이 아닐때
            // 처음으로 좋아요나 싫어요를 해준 상태
            vote = new Vote();  
            vote.user = user;
            vote.value = value;
            console.log('voted입니다' ,vote);
            //게시물에 속한 vote or 댓글에 속한 vote 인지
            if(comment) vote.comment = comment; //댓글에 속한 vote
            else vote.post = post;
            await vote.save();
        }else if(value === 0) {
            // 0이라면 들어간 데이터베이스 자료를 삭제
            vote.remove();
        } else if ( vote.value !== value) {
            vote.value = value;
            await vote.save();
        }

        post = await Post.findOneOrFail({
            where : {
                identifier, slug
            },
            relations: ['comments', 'comments.votes', 'sub', 'votes']
        });

        post.setUserVote(user);
        post.comments.forEach((comment) => comment.setUserVote(user));
        return res.json(post);
    }catch (error) {
        console.log(error);
        return res.status(500).json({error:'문제가 발생했습니다.'});
    }
    
}




const router = Router();
router.post('/', userMiddleware, authMiddleware, vote);

export default router;