import { Request, Response } from 'express';
import EmployeeService from '../services/employeeService';

class EmployeeController {
    private employeeService: EmployeeService;

    constructor() {
        this.employeeService = new EmployeeService();
    }

    public getFunc = async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await this.employeeService.getAllEmployees();
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    
                DT: data.DT
            })
        } catch (er) {
            console.error(er);
            return res.status(500).json({
                EM: 'Error from server',  
                EC: -1,   
                DT: ''
            })
        }
    };

    public insertFunc = async (req: Request, res: Response): Promise<any> => {
        try {
            let data = await this.employeeService.insertAnEmployee(req.body);
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    
                DT: data.DT
            })
        } 
        catch (error){
            console.log(error);
            return res.status(500).json({
                EM: 'Error from server',  
                EC: -1,   
                DT: ''
            })
        }
    };


    public updateFunc = async (req: Request, res: Response): Promise<any> => {
        try {
            let data = await this.employeeService.updateAnEmployee(req.body);
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    
                DT: data.DT
            })
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json({
                EM: 'Error from server',  
                EC: -1,   
                DT: ''
            })
        }
    };

    public deleteFunc = async (req: Request, res: Response): Promise<any> => {
        try {
            let data = await this.employeeService.deleteAnEmployee(req.body.id);
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    
                DT: data.DT
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                EM: 'Error from server',  
                EC: -1,   
                DT: ''
            })
        }
    };

}

export default EmployeeController;
