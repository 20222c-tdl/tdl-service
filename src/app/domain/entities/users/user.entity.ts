import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User{
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;
    
    @Column()
    public email: string;
    
    @Column()
    public password: string;
    
    @Column()
    public address: string;
    
    @Column()
    public phoneNumber: string;
    
    @Column()
    public communityId: string;
}

export default User;