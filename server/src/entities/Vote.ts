import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import BaseEntity from './Entity';
import { User } from "./User";
import Post from "./Post";
import Comment from "./Comment";

@Entity('votes')
export default abstract class Vote extends BaseEntity {
    
    @Column()
    value: number;

    @ManyToMany(() => User)
    @JoinColumn({name:'username', referencedColumnName:'unsername'})
    user : User

    @Column()
    username: string;

    @Column({nullable : true})
    postId : number;

    @ManyToOne(() => Post)
    post : Post;


    @Column({nullable: true})
    commentId : number;
    

    @ManyToOne(() => Comment)
    comment : Comment;
}