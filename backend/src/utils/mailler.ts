const nodemailer = require('nodemailer')






const transporter = nodemailer.createTransport({
  
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: ' estateempire.info@gmail.com',
    pass: 'gyqf tyoa phzv umsy',
  },
});

 export const sendVerifyMail = async (email:string,otp:string) => {
    try {
      const mailOptions = {
        from: 'estateempire.info@gmail.com',
        to: email,
        subject: 'For verification purpose',
        html: `<p>Hello, please enter this OTP: <strong>${otp}</strong> to verify your email.</p>`,
      };

       const information=await  transporter.sendMail( mailOptions);

       return true
 
    } catch (error) {
      console.log(error);
    }
   
  };


  export const sendPassword = async (email:string,password:string) => {
    try {
      const mailOptions = {
        from: 'estateempire.info@gmail.com',
        to: email,
        subject: 'For verification purpose',
        html: `<p>Hello , your password is : <strong>${password}</strong> .</p>`,
      };

       const information=await  transporter.sendMail( mailOptions);

       return true
 
    } catch (error) {
      console.log(error);
    }
   
  };

  export const sendService = async (name:string|undefined,phone:string,email:string|undefined) => {
    try {
      const mailOptions = {
        from: 'estateempire.info@gmail.com',
        to: email,
        subject: 'For booking service',
        html: `<p>Hello,${name} IS BOOKED event, </p>
        <p>Phone number: <strong>${phone}</strong> .</p>
        `,
      };

       const information=await  transporter.sendMail( mailOptions);

       return true
 
    } catch (error) {
      console.log(error);
    }
   
  };
  

  
  
   