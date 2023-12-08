import { User } from "../model/user.model.js";

const getStudents = async (req, res) => {
    try {
        const { keyword, page } = req?.query;

        const pageNumber = parseInt(page) || 1;
        const limit = 10;

        let query = {
            role: 1,
            isDeleted: 0,
            isActive: 0,
        };

        if (keyword) {
            query["$or"] = [
                { username: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
            ]
        }

        const totalStudents = await User.countDocuments(query);

        const skip = (pageNumber - 1) * limit;

        const students = await User.find(query).skip(skip).limit(limit);

        const jsonUpdatedData = JSON.parse(JSON.stringify(students));


        const finalUpdatedStudents = jsonUpdatedData?.map((student) => {
            delete student.password;
            delete student.isAvatarImageSet;
            delete student.avatarImage;
            delete student.token;
            delete student.contacts;
            return student;
        });

        return res.status(200).send({
            success: true,
            message: "Student found successfully",
            data: finalUpdatedStudents,
            totalStudents,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalStudents / limit),
        });
    } catch (error) {
        console.log("An error occurred", error);
        return res.status(500).send({ success: false, message: "Internal server error while getting a students", error: error });
    }
}

const addStudent = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const contactUserIds = [req?.body?.studentId]

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const existingContacts = user?.contacts?.map(contact => contact.toString());

        const isContactAlreadyAdded = existingContacts.includes(contactUserIds[0].toString());


        if (!isContactAlreadyAdded) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { contacts: { $each: contactUserIds } } },
                { new: true }
            );

            return res.status(200).send({ success: true, message: 'Student added successfully', data: updatedUser?.contacts });
        } else {

            return res.status(400).send({ success: false, message: 'Student already added' });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while adding a student' });
    }
}

const removeStudent = async (req, res) => {
    try {

        const userId = req?.user?.id;
        const contactUserIds = [req?.body?.studentId]

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const existingContacts = user?.contacts?.map(contact => contact.toString());

        const isContactAlreadyNotAdded = !existingContacts.includes(contactUserIds[0].toString());

        if (!isContactAlreadyNotAdded) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { contacts: { $in: contactUserIds } } },
                { new: true }
            );

            return res.status(200).send({ success: true, message: 'Student removed successfully', data: updatedUser?.contacts });
        } else {
            return res.status(400).send({ success: false, message: 'This Student is not already added' })

        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while removing a student' });
    }
}


const addedStudent = async (req, res) => {
    try {
        const userId = req?.user?.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const updatedStudent = JSON.parse(JSON.stringify(user));

        return res.status(200).send({ success: true, message: "Student gets successfully", data: updatedStudent?.contacts });


    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a students' });
    }
}

const getStudentData = async (req, res) => {
    try {

        const { ids } = req?.body;

        const users = await User.find({ _id: { $in: ids } });

        const jsonUpdatedData = JSON.parse(JSON.stringify(users));

        const finalData = jsonUpdatedData?.map((data) => {
            return {
                username: data?.username,
                id: data?._id,
            }
        })


        return res.status(200).send({ success: true, message: "Student Data was successfully retrieved", data: finalData })
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: 'Internal server error while getting a students' });
    }
}


export { getStudents, addStudent, removeStudent, addedStudent, getStudentData }