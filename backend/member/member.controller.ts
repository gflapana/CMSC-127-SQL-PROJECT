import pool from "../config/connectDB"
import express from "express";

const editDetails = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let query = "UPDATE member SET first_name = ?, middle_name = ?, last_name = ?, sex = ?, degree_program = ?, batch = ?  WHERE member_id = ?";
    let params: string[] = [];
    params.push(req.body.first_name);
    params.push(req.body.middle_name);
    params.push(req.body.last_name);
    params.push(req.body.sex);
    params.push(req.body.degree_program);
    params.push(req.body.batch);
    params.push(req.body.member_id);

    console.log(params);
    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(query, params);
            // await conn.commit();
            res.json({ status: "success" });
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

export { editDetails };