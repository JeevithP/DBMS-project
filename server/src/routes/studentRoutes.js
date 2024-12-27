const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const hashPassword = require("../utils/password");

const router = Router();
const prisma = new PrismaClient();

// Create student
router.post("/", async (req, res) => {
    const { usn, name, email, password, did, cid } = req.body;

    // Check if all fields are present
    if (!usn || !name || !email || !password || !did || !cid) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Missing fields in the request!",
        });
        return;
    }

    // Check if a user already exists with that USN or Email
    let student = await prisma.students.findUnique({
        where: {
            usn: usn,
        },
    });

    if (student) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Student with that USN already exists!",
        });
        return;
    }

    student = await prisma.students.findUnique({
        where: {
            email: email,
        },
    });

    if (student) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Student with that email already exists!",
        });
        return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new student entry
    try {
        const result = await prisma.students.create({
            data: {
                usn,
                name,
                email,
                password: hashedPassword,
                points: 0,
                counsellor_id: Number(cid),
                department_id: Number(did),
            },
        });

        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Some unknown error has occurred",
        });
    }
});

module.exports = router;
