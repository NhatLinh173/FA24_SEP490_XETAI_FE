import React from 'react'
import CommonBanner from '../component/Common/Banner'
import ContactDetails from '../component/Contact'

const Contact = () => {
    return (
        <div className='pb-5'>
            <CommonBanner heading="Contact Us" page="Contact Us"/>
            <ContactDetails/>
        </div>
    )
}

export default Contact
