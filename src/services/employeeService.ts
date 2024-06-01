import { PrismaClient } from '@prisma/client';

interface UserInfo {
    id: string;
    name: string;
    position: string;
    dayin: string;
    dayout: string;
}

class EmployeeService {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public getAllEmployees = async ():Promise<any> => {
        try {
            const userData = await this.prisma.employees.findMany();
            if(userData){
                return {
                    EM: 'get data success', 
                    EC: 0, 
                    DT: userData
                }
            } else {
                return {
                    EM: 'get data success', 
                    EC: 0, 
                    DT: []
                }
            }
        } catch (error){
            console.log(error);
            return {
                EM: 'something wrongs with services', 
                EC: 1, 
                DT: {}
            }
        }
    }
    
    public getAnlEmployee = async (id: string):Promise<any> => {
        return await this.prisma.employees.findMany({
            where: { id }
        });
    }

    public insertAnEmployee = async (user: UserInfo):Promise<any> => {
        const checkId = await this.checkIDexists(user.id);
        if(checkId){
            return{
                EM: 'This ID is already exist',
                EC: 1,
                DT: 'id'
            }
        }
        const checkDay = await this.checkDayValid(user.dayin, user.dayout);
        if(checkDay){
            return{
                EM: 'Invalid format dd/mm/yyyy',
                EC: 1,
                DT: 'dayin-dayout'
            }
        }
        try {
            await this.prisma.employees.create({
                data: {
                    id: user.id,
                    name: user.name,
                    position: user.position,
                    dayin: user.dayin,
                    dayout: user.dayout
                }
            })
            return {
                EM: 'create employee successfully', 
                EC: 0, 
                DT: []
            }
        } catch(error){
            console.log(error);
            return {
                EM: 'Error from service', 
                EC: 1, 
                DT: []
            }
        }
    }

    public updateAnEmployee = async (user: UserInfo):Promise<any> => {
        const checkDay = await this.checkDayValid(user.dayin, user.dayout);
        if(checkDay){
            return{
                EM: 'Invalid format dd/mm/yyyy',
                EC: 1,
                DT: 'dayin-dayout'
            }
        }
        try {
            let userId = await this.prisma.employees.findUnique({ id: user.id });
            if(userId){
                await this.prisma.employees.update({
                    where: { id: user.id },
                    data: {
                        id: user.id,
                        name: user.name,
                        position: user.position,
                        dayin: user.dayin,
                        dayout: user.dayout
                    }
                });
                return {
                    EM: 'Update employee successfully', 
                    EC: 0, 
                    DT: ''
                }
            }else {
                return {
                    EM: 'Not found employee', 
                    EC: 2, 
                    DT: ''
                }
            }
        } catch (error){
            console.log(error);
            return {
                EM: 'Something wrongs with services', 
                EC: 1, 
                DT: []
            }
        }
    }

    public deleteAnEmployee = async (id: string):Promise<any> => {
        try {
            let userExist = await this.prisma.employees.findUnique({ id });
            if(userExist){
                await this.prisma.employees.delete({
                    where: { id }
                });
                return {
                    EM: 'Delete employee successfully', 
                    EC: 0, 
                    DT: userExist
                }
            }else {
                return {
                    EM: 'Not found employee', 
                    EC: 2, 
                    DT: []
                }
            }
        } catch (error){
            console.log(error);
            return {
                EM: 'Something wrongs with services', 
                EC: 1, 
                DT: []
            }
        }
    }

    public checkIDexists = async (id: string):Promise<any> => {
        const result = await this.prisma.employees.findMany({ where: { id } });
        return (result && Object.keys(result).length != 0)
    }

    public checkDayValid = async (dayin:string, dayout:string):Promise<any> => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        return (!dateRegex.test(dayin) || !dateRegex.test(dayout))
    }
}

export default EmployeeService;
