// FakeAlert.JS
import React, {useEffect} from "react";
import { useAlert } from "react-alert";

export default function FakeAlert() {
    var fakeFunc = function() {
        console.log('hi from fakeFunc')
    }
    
    const alert = useAlert()
    console.log(alert)
    useEffect(() => {
        console.log('hey')
        alert.success('hello')
        // showAlert('success', 'hello')
    }, [alert])

    return <></>;
}