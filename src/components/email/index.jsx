import React, { useState } from 'react'


// {
//     "email": "email",
//     "adminPin": "adminPin",
//     "emailType": "send-message",    //selected-referral, confirmation-email, subscription-purchase,  send-message
//     "message": "Greetings! We acknowledge the receipt of your valuable feedback and concerns. Allow us to shed light on the matter at hand. Firstly, the quantity of opportunities available on a daily basis is contingent upon the matches scheduled for that particular day and the selection of bookmakers. Secondly, it is important to note that during weekdays, opportunities may be comparatively fewer due to a limited number of matches taking place. However, we highly recommend conducting thorough research on the diverse bookmakers we provide, followed by signing up and completing the account verification process. This will grant you access to a wider array of opportunities. Please be aware that certain bookmakers are international in nature and may require a valid identification document during the verification process. Should you have any further queries or require additional assistance, our dedicated team remains at your disposal.", 
//     "messageSubject": "From ArbsKing",
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
    const [messageType, setMessageType] = useState("single")
    const [message, setMessage] = useState("")
    const [messageSubject, setMessageSubject] = useState("")
    const [multipleEmails, setMultipleEmails] = useState("")
    const [subCost, setSubCost] = useState("")
    const [subDuration, setSubDuration] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSuccess, setEmailSuccess] = useState("")
    const [emailError, setEmailError] = useState("")
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    // console.log(loggedInAdmin)
    // nwfrgodwin@gmail.com
    console.log(emailType)

    async function sendMessage(e){
        e.preventDefault()
        setLoading(true)
            console.log(JSON.stringify({email, adminPin, emailType, message, messageSubject, subCost, subDuration, multipleEmails, messageType}))
        const response = await fetch("https://sportbetpredict.onrender.com/api/admin/send-email", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedInAdmin}`
            },
            body: JSON.stringify({email, adminPin, emailType, message, messageSubject, subCost, subDuration, multipleEmails, messageType})
        })
        const data = await response.json()
        if(response) setLoading(false)
        if(!response.ok) setEmailError(data.message)
        if(response.ok) setEmailSuccess(data.message)
        console.log(response, data)
    }

    function resetForm(){
        setEmail(userEmail)
        setAdminPin("")
        setEmailType("send-message")
        setMessageType("single")
        setMultipleEmails()
        setMessage("")
        setMessageSubject("")
        setSubCost("")
        setSubDuration("")
        setServerResponse("Send Email To User(s)")
    }

  return (
    <div className='emailUserBg'>
        <div className='emailBox'>
            <p className='text-center mb-3'>Send Email To User(s)</p>
            {emailSuccess && <p className='text-center alert alert-success py-2'>{emailSuccess}</p> }
            {emailError && <p className='text-center alert alert-danger py-2'>{emailError}</p> }
            {/* <p className='text-center'>Send Email To User(s)</p> */}
            <i className="fa-solid fa-rectangle-xmark" onClick={e => setIsEmailOpen(false)}></i>
            <div className='d-flex justify-content-between'>
                <div>
                    <p style={{ fontSize:"13px", marginTop:"10px" }}>Select Email Type</p>
                    <select onChange={e => setEmailType(e.target.value)}>
                        <option value="send-message">Send Message</option>
                        <option value="selected-referral">selected Referral</option>
                        <option value="confirmation-email">Confirmation Email</option>
                        <option value="subscription-purchase">Subscription Purchase</option>
                        <option value="withdrawal-email">Withdrawal-email</option>
                        <option value="logged-out-email">Logged Out Email</option>
                    </select>
                </div>
                <div>
                    <p style={{ fontSize:"13px", marginTop:"10px" }}>Select Message Type</p>
                    <select onChange={e => setMessageType(e.target.value)}>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <i className='fa-solid fa-spinner' style={{ cursor:"pointer", display:"inline-block" }} onClick={resetForm}></i>
            </div>
            <form className="sendMessage" onSubmit={sendMessage}>
                <div className="d-flex justify-content-between gap-3">
                    {messageType === "single" ? 
                    (<div style={{ width:"100%" }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>) 
                    : 
                    messageType === "all" ? "" 
                    : 
                    messageType === "multiple" ?
                    (<div style={{ width:"100%" }}>
                        <label htmlFor="email">Enter Multiple Emails</label>
                        <input type="text" value={multipleEmails} onChange={e => setMultipleEmails(e.target.value)} required/>
                    </div>):""
                     }
                    
                    {emailType === "send-message" ?
                    <div style={{ width:"100%" }}>
                        <label htmlFor="email">Email Subject</label>
                        <input type="text" value={messageSubject} onChange={e => setMessageSubject(e.target.value)} required/>
                    </div>
                    :
                    ""
                    }
                </div>
                {emailType === "subscription-purchase" ? 
                    <div className="d-flex justify-content-between gap-3">
                        <div style={{ width:"100%" }}>
                            <label htmlFor="Sub Cost">Sub Cost</label>
                            <input type="number" value={subCost} onChange={e => setSubCost(e.target.value)} required/>
                        </div>
                        <div style={{ width:"100%" }}>
                            <label htmlFor="Sub Duration">Sub Duration</label>
                            <input type="number" value={subDuration} onChange={e => setSubDuration(e.target.value)} required/>
                        </div>
                    </div>
                            :
                    ""
                }
                <div>
                    <label htmlFor="Admin Pin">Admin Pin</label>
                    <input type="text" value={adminPin} onChange={e => setAdminPin(e.target.value)} required/>
                </div>
                
                {emailType === "send-message" ? 
                <div>
                    <label htmlFor="Message">Message</label>
                    <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                </div>
                :
                ""
                }
                <button className='mt-3'>
                    {loading ? <i className='fa-solid fa-spinner fa-spin' ></i> : <div style={{ margin: "0" }} type='submit'> Send Email</div> }
                </button>
            </form>
        </div>
    </div>
  )
}

export default EmailUser