const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.getToken = async() => {
	let buf = await crypto.randomBytes(20);
	return buf.toString("hex");
}

exports.transportMail = (to, subject, text) => {
	let transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.GMAILUSER,
			pass: process.env.GMAILPWD
		}
	})
	let mailOptions = {
        from: process.env.GMAILUSER,
		to, subject, text
    }
	transport.sendMail(mailOptions);
}

exports.genAccMail = (password, to, userType) => {
	let subject = "Registration Online Information - Magazine Collection System";
	let text = `Hello, this mail is from Magazine Collection System,

Your information has been verified and below here is the password for your ${userType} account:
"${password}"

This is the automatic email from the system, please do not reply.`;
	return [to, subject, text];
}

const submit = (lecName, stuName, to) => {
	let subject = "Submitted Contribution Notification - Magazine Collection System";
	let text = `Hello, this mail is from Magazine Collection System,

Dear Mr. ${lecName} who is one of our university's lecturers, a contribution from student ${stuName} who is under
your management has been submitted to the system. Please review and approve as soon as possible.

This is the automatic email from the system, please do not reply.`;
	return [to, subject, text];
}

const approve = (coorName, stuName, to) => {
	let subject = "Approved Submitted Contribution Notification - Magazine Collection System";
	let text = `Hello, this mail is from Magazine Collection System,

Dear Mr. ${coorName} who is one of our university's coordinators, a contribution from student ${stuName} who is under
your management has been submitted and approved in the system. Please review and make a comment within 14 days from
submitted date of the contribution.

This is the automatic email from the system, please do not reply.`;
	return [to, subject, text];
}

const comment = (coorName, stuName, colName, to) => {
	let subject = "Commented Contribution Notification - Magazine Collection System";
	let text = `Dear ${stuName},

Your submitted contribution to collection "${colName}" has been commented by ${coorName} who is the manager of your faculty.
Please view comment as soon as you have time to prepare for improving or resubmitting as request from coordinator.

This is the automatic email from Magazine Collection System, please do not reply.`;
	return [to, subject, text];
}

const select = (coorName, stuName, colName, to) => {
	let subject = "Selected Contribution Notification - Magazine Collection System";
	let text = `Dear ${stuName},

Your submitted contribution to collection "${colName}" has been selected for publicizing by ${coorName} who is the manager of your faculty.
Report if this is an error from our system. Have a good day.

This is the automatic email from Magazine Collection System, please do not reply.`;
	return [to, subject, text];
}

const deny = (stuName, to) => {
	let subject = "Denied Submitted Contribution Notification - Magazine Collection System";
	let text = `Hello, this mail is from Magazine Collection System,

Dear Mr. ${stuName}, your submitted contribution has been denied in the system. Please review and reupload a different contribution for the collection as soon as possible. Having a denied contribution is similar to those who didn't upload, there is no reupload after closure date.

This is the automatic email from the system, please do not reply.`;
	return [to, subject, text];
}

exports.mails = {submit, approve, comment, select, deny};
