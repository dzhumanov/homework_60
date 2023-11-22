import Form from 'react-bootstrap/Form'

const ChatForm = () => {
    return(
        <>
            <Form>
                <Form.Group className='mb-3' controlId='controlText'>
                    <Form.Label>Type your message</Form.Label>
                    <Form.Control as='textarea' rows={3}></Form.Control>
                </Form.Group>
            </Form>
        </>
    )
}

export default ChatForm;