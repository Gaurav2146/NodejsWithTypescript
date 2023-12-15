import { EntityManager, QueryRunner, FindManyOptions } from "typeorm";
import { User } from "../entity/OneToOne/User";
import { DatabaseFactory } from "../factory/databaseFactory";
import { Category } from "../entity/ManyToMany/Category ";
import { Question } from "../entity/ManyToMany/Question";
let queryRunner: QueryRunner;

import { Profile } from "../entity/OneToOne/Profile";
import { Student } from "../entity/OneToMany/Student";
import { Subject } from "../entity/OneToMany/Subject";

export class OrderService {

    async createOrder(name: string, gender: string) {
        try {
            const user = new User();
            user.name = name;

            const profile = new Profile();
            profile.gender = gender;

            user.profile = profile;

            // The following database drivers support the standard isolation levels 
            //(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE):
            // MySQL
            // Postgres
            // SQL Server

            //IMPLEMENTING TRANSACTION and ISOLATION LEVELS
            return await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {
                await transactionalEntityManager.save(user);
            })

            // INSERTING DATA WITHOUT USING TRANSACTION
            // return await DatabaseFactory.getDataSource().manager.save(user3);
            // return DatabaseFactory.AppDataSource.manager.create(User,{name:name,price:price});
        } catch (error) {
            throw new Error();
        }
    }

    //FETCHING RESULTS USING CUSTOM QUERY
    async getOrder() {
        try {
            queryRunner = DatabaseFactory.getDataSource().createQueryRunner();
            // establish real database connection using our new query runner
            await queryRunner.connect();

            //IMPLEMENTING TRANSACTION and ISOLATION LEVELS
            await queryRunner.startTransaction("SERIALIZABLE");

            await queryRunner.query('insert into user (name,price) values("Gaurav",135)');

            await queryRunner.query('insert into user (name,price) values("Gaurav1",136)');

            await queryRunner.query("Delete from user where price=135");

            await queryRunner.query("update user set name='Rahul' where price=136");

            //commit transaction now:
            await queryRunner.commitTransaction();

            // ALWAYS USE SELECT STATEMENT OUTSIDE TRANSACTION
            return await queryRunner.query("SELECT * FROM user");
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            throw new Error(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }

    async getAllUser() {
        try {
            return await DatabaseFactory.getDataSource().manager.find(User);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async insertCategoryAndQuenstions(question: Question, category: Category) {
        try {
            let result;
            await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {
                result = await transactionalEntityManager.save(question);
            })
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCategoryAndQuenstions(questionId: number) {
        try {
            let result;
            await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {
                result = await transactionalEntityManager.findBy(Question, { id: questionId });
            })
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //=================================== ONE TO MANY ========================================================

    async insertStudentAndSubject(studentName: string, subjectName:string) {
        try {
            
            //In Bi-Directional relation, You must provide data to both relation attributes before saving.
             let student = new Student();
             student.name = studentName;

             let subject = new Subject();
             subject.name = subjectName;
             subject.student = student;

             student.subject=new Array(subject);

            return await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {
                await transactionalEntityManager.save(student);
            })
            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getStudentAndSubject(studentName: string) {
        try {
            
            let result:Subject[] = [];

            // If it is OneToMany mapping, then query should be done on the entity which is Many because on that side foreign key is present.
            await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {
           
                result = await transactionalEntityManager.find( Subject,
                {
                    relations:{
                        student:true
                    },
                    where:{
                        student:{name:studentName}
                    }
                });
             
            })

            return result;
        } catch (error: any) {
            console.log(error,"error");
            throw new Error(error.message);
        }
    }

    async getStudent(studentName: string) {
        try {
            
            let result:Student[] = [];

            await DatabaseFactory.getDataSource().manager.transaction("SERIALIZABLE", async (transactionalEntityManager: EntityManager) => {           
                result = await transactionalEntityManager.find( Student,
                {
                    where:{
                        name:studentName
                    }
                });
            })

            return result;
        } catch (error: any) {
            console.log(error,"error");
            throw new Error(error.message);
        }
    }

    //=================================== ONE TO MANY END ========================================================
}