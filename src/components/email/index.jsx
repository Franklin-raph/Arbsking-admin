import React from 'react'

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


const EmailUser = () => {
  return (
    <div className='emailUserBg'>
        <div className='emailBox'>
            <p>Select Email Type</p>
            <select>
                <option value="send-message">Send Message</option>
                <option value="selected-referral">selected Referral</option>
                <option value="confirmation-email">Confirmation Email</option>
                <option value="subscription-purchase">Subscription Purchase</option>
            </select>
            <div className="sendMessage">
                <div>
                    <label htmlFor="emai">Email</label>
                    <input type="email"/>
                </div>
                <div>
                    <label htmlFor="emai">Admin Pin</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="emai">Email Subject</label>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="emai">Message</label>
                    <textarea></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmailUser