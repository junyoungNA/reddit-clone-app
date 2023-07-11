import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from './Entity'
import { User } from "./User";
import { Expose, Exclude } from "class-transformer";
import { makeId } from "../utilis/helpers";
import Post from "./Post";
import Vote from "./Vote";

@Entity('comments')
export default class Comments extends BaseEntity {
    @Index()
    @Column()
    identifier : string;

    @Column()
    body : string;

    @Column()
    username : string;

    @ManyToOne(() => User)
    @JoinColumn({name : 'username', referencedColumnName:'username'})
    user : User

    @Column()
    postId : number;

    @ManyToOne(() => Post, (post) => post.comments, {nullable : false})
    post : Post;

    @Exclude()
    @OneToMany(() => Vote, (vote) => vote.comment)
    votes : Vote[]

    protected userVote : number;

    setUserVote(user : User) {
        const index = this.votes?.findIndex(v => v.username === user.username);
        this.userVote  = index > -1 ? this.votes[index].value: 0;
    }

    @Expose() get voteScore() : number {
        const initalValue = 0;
        return this.votes?.reduce((previousValue, currentObject) =>previousValue + (currentObject.value|| 0), initalValue)
    }
    
    @BeforeInsert()
    makeId() {
        this.identifier = makeId(8);
    }
}