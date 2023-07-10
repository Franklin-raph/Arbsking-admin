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
    const [message, setMessage] = useState("")
    const [messageSubject, setMessageSubject] = useState("")
    const [subCost, setSubCost] = useState("")
    const [subDuration, setSubDuration] = useState("")
    const [loading, setLoading] = useState(false)
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'))
    // console.log(loggedInAdmin)
    // nwfrgodwin@gmail.com
    console.log(emailType)

    async function sendMessage(e){
        e.preventDefault()
        setLoading(true)
        console.log(JSON.stringify({email, adminPin, emailType, message, messageSubject, subCost, subDuration}))
        const response = await fetch("https://sportbetpredict.onrender.com/api/admin/send-email", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedInAdmin}`
            },
            body: JSON.stringify({email, adminPin, emailType, message, messageSubject, subCost, subDuration})
        })
        const data = await response.json()
        if(response) setLoading(false)
        console.log(response, data)
    }

    function resetForm(){
        setEmail(userEmail)
        setAdminPin("")
        setEmailType("send-message")
        setMessage("")
        setMessageSubject("")
        setSubCost("")
        setSubDuration("")
    }

  return (
    <div className='emailUserBg'>
        <div className='emailBox'>
            <i className="fa-solid fa-rectangle-xmark" onClick={e => setIsEmailOpen(false)}></i>
            <p style={{ fontSize:"13px", marginTop:"10px" }}>Select Email Type</p>
            <div className='d-flex justify-content-between'>
                <select onChange={e => setEmailType(e.target.value)}>
                    <option value="send-message">Send Message</option>
                    <option value="selected-referral">selected Referral</option>
                    <option value="confirmation-email">Confirmation Email</option>
                    <option value="subscription-purchase">Subscription Purchase</option>
                    <option value="withdrawal-email">Withdrawal-email</option>
                </select>
                <i className='fa-solid fa-spinner' style={{ cursor:"pointer" }} onClick={resetForm}></i>
            </div>
            <form className="sendMessage" onSubmit={sendMessage}>
                <div className="d-flex justify-content-between gap-3">
                    <div style={{ width:"100%" }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
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
                <button>
                    {loading ? <i className='fa-solid fa-spinner fa-spin' ></i> : <div style={{ margin: "0" }} type='submit'> Send Email</div> }
                </button>
            </form>
        </div>
    </div>
  )
}

export default EmailUser