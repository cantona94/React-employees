const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/employees/
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(500).json({ message: "Не удалось получить сотрудников" })
    }
};

/**
 * @route POST api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({ data: "Все поля обязятельные" });
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            },
        });

        return res.status(201).json(employee);
    } catch {
        res.status(500).json({ message: "Не удалось добавить сотрудника" })
    }
};

/**
 * @route POST api/employees/remove:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    try {
        const { id } = req.body;

        await prisma.employee.delete({
            where: {
                id
            },
        });

        res.status(204).json("OK");
    } catch (err) {
        return res.status(500).json({ message: "Не удалось удалить сотрудника" });
    }
};

/**
 * @route PUT api/employees/edit:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    try {
        const data = req.body;
        const id = data.id;

        await prisma.employee.update({
            where: {
                id,
            },
            data
        });

        res.status(204).json("OK");
    } catch {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route GET api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */

const employee = async (req, res) => {
    try {
        const { id } = req.params;
        
        const employee = await prisma.employee.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(employee);
    } catch {
        res.status(500).json({ message: "Не удалось получить сотрудника" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    employee
};