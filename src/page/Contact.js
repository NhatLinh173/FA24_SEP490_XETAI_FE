import React from 'react'
import CommonBanner from '../component/Common/Banner'
import ContactDetails from '../component/Contact'

const Contact = () => {
    return (
        <div className='pb-5'>
            <CommonBanner heading="Liên hệ" page="Liên hệ"/>
            <ContactDetails/>
        </div>
    )
}

export default Contact
