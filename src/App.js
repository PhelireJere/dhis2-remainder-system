import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import classes from './App.module.css'
import Enrollment from './Components/Enrollment'


const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)

    if (error) {
        return <span>{i18n.t('ERROR')}</span>
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>
    }

    return (
        
        <div className={classes.container}>
             <PatientEnrollment/>
            <bio/>
            <h1>{i18n.t('  {{hey}}', { name: data.me.name })}</h1>
            <h3>{i18n.t('')}</h3>
            <bio/>
        </div>
    )
}

export default MyApp
