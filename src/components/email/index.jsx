import React, { useState } from 'react'


//   {
//     "email": "userEmail",
//     "adminPin": "adminPin",
//     "emailType": "send-message",    //selected-referral, confirmation-email, subscription-purchase,  send-message
//     "message": "Sorry to inform you but your account have been deactivated for breaking terms and condition of ArbsKing. Please contact customer care for assistance.", 
//     "messageSubject": "Account Deactivated.",
//     "subCost": "10.2",              //if its for subscription-purchase emailtype
//     "subDuration": "1 month"        //if its for subscription-purchase emailtype
// }


// Selected Referral => email and adminPin
// Confirmation-email => email and adminPin
// Subscription-purchase => email, adminPin, subCost and subDuration
// Send-message => email, admin, message subject and message


const EmailUser = ({userEmail, setIsEmailOpen}) => {
    const [email, setEmail] = useState(userEmail)
    const [adminPin, setAdminPin] = useState("")
    const [emailType, setEmailType] = useState("send-message")
    const [message, setMessage] = useState("")
    const [messageSubject, setMessageSubject] = useState("")
    const [subCost, setSubCost] = useState("")
    const [subDuration, setSubDuration] = useState("")
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    // console.log(loggedInAdmin)

    console.log(emailType)

    async function sendMessage(){
        // const response = await fetch("https://sportbetpredict.onrender.com/api/admin/send-email", {
        //     method:"POST",
        //     headers: {
        //         Authorization: `Bearer ${loggedInAdmin}`
        //     }
        // })
    }

  return (
    <div className='emailUserBg'>
        <div className='emailBox'>
            <i className="fa-regular fa-rectangle-xmark" onClick={e => setIsEmailOpen(false)}></i>
            <p style={{ fontSize:"13px", marginTop:"10px" }}>Select Email Type</p>
            <select onChange={e => setEmailType(e.target.value)}>
                <option value="send-message">Send Message</option>
                <option value="selected-referral">selected Referral</option>
                <option value="confirmation-email">Confirmation Email</option>
                <option value="subscription-purchase">Subscription Purchase</option>
            </select>
            <form className="sendMessage" onSubmit={sendMessage}>
                <div className="d-flex justify-content-between gap-3">
                    <div style={{ width:"100%" }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div style={{ width:"100%" }}>
                        <label htmlFor="email">Email Subject</label>
                        <input type="text" required/>
                    </div>
                </div>
                {emailType === "subscription-purchase" ? 
                    <div className="d-flex justify-content-between gap-3">
                        <div style={{ width:"100%" }}>
                            <label htmlFor="Pin">Sub Cost</label>
                            <input type="number" required/>
                        </div>
                        <div style={{ width:"100%" }}>
                            <label htmlFor="emai">Sub Duration</label>
                            <input type="number" required/>
                        </div>
                    </div>
                            :
                    ""
                }
                <div>
                    <label htmlFor="Pin">Admin Pin</label>
                    <input type="text" required/>
                </div>
                
                <div>
                    <label htmlFor="Message">Message</label>
                    <textarea rows={5} required></textarea>
                </div>
                <button type='submit'>Send Email</button>
            </form>
        </div>
    </div>
  )
}

export default EmailUser