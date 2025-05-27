import express from "express";
import pool from "../config/connectDB";

const signIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let query;
        let params: string[] = [];
        if (req.body.type == 'member') {
            query = "SELECT member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch from member WHERE member_username = ? AND member_password = SHA2(?,0)";
        } else if (req.body.type == "organization") {
            query = "SELECT organization_id, organization_name, organization_type, date_established, years_active from organization WHERE organization_username = ? AND organization_password = SHA2(?,0)";
        }

        if (req.body.username && typeof req.body.username === 'string') {
            params.push(req.body.username);
        }
        if (req.body.password && typeof req.body.password === 'string') {
            params.push(req.body.password);
        }

        const conn = await pool.getConnection();
        try {
            const userQuery = await conn.query(query, params);
            const user = userQuery[0];
            res.json({ user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const signUpAsMember = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const query = "INSERT INTO member (first_name,middle_name,last_name,sex,degree_program,batch,member_username,member_password) VALUES (?,?,?,?,?,?,?,SHA2(?,0))";
        let params: string[] = [];

        params.push(req.body.first_name);
        params.push(req.body.middle_name);
        params.push(req.body.last_name);
        params.push(req.body.sex);
        params.push(req.body.degree_program);
        params.push(req.body.batch);
        params.push(req.body.username);
        params.push(req.body.password);


        const conn = await pool.getConnection();
        try {
            const checker = await conn.query("SELECT * from member where member_username = ?", [req.body.username]);
            if (checker[0] != null) {
                res.status(400).json({ status: "taken" });
                return;
            }
            await conn.query(query, params);
            
            const userQuery = await conn.query("SELECT member_id, first_name, IFNULL(middle_name,'') middle_name, last_name, sex, degree_program, batch from member WHERE member_username = ?", [req.body.username]);
            const user = userQuery[0];
            res.json({ status: "success", user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const signUpAsOrganization = async(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const query = "INSERT INTO organization (organization_name, organization_type, date_established, years_active, organization_username, organization_password) VALUES (?,?,?,YEAR(CURDATE())-?,?,SHA2(?,0))";
        let params: string[] = [];

        params.push(req.body.organization_name);
        params.push(req.body.organization_type);
        params.push(req.body.date_established);
        params.push(req.body.date_established);
        params.push(req.body.username);
        params.push(req.body.password);


        const conn = await pool.getConnection();
        try {
            const checker = await conn.query("SELECT * from organization where organization_username = ?", [req.body.username]);
            if (checker[0] != null) {
                res.status(400).json({ status: "taken" });
                return;
            }
            await conn.query(query, params);
            
            const userQuery = await conn.query("SELECT organization_id, organization_name, organization_type, date_established, years_active from organization WHERE organization_username = ?", [req.body.username]);
            const user = userQuery[0];
            res.json({ status: "success", user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            conn.release();
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { signIn, signUpAsMember, signUpAsOrganization };