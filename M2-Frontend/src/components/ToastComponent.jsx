import React, { useState } from 'react'
import { Toast, Button } from 'react-bootstrap';

export default function ToastComponent({mess}) {
    const [showToast, setToast] = useState(false)
    return (
        <div>
            <h2 className="mb-4">
                React JS Desktop Notification with Bootstrap Example
            </h2>
            <Toast
                onClose={() => setToast(false)}
                autohide
                show={showToast}
                delay={2200}
            >
                <Toast.Body>{mess}</Toast.Body>
            </Toast>
            <Button onClick={() => setToast(true)}>Show Toast</Button>
        </div>
    )
}