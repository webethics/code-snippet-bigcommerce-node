import { Box,Button,Form,FormGroup,H3,Panel,Textarea } from '@bigcommerce/big-design';
import { useRouter } from 'next/router';
import React from "react";
import { useSession } from '../../context/session';

const Index = () => {
    const router = useRouter();
    const encodedContext = useSession()?.context;
    const [widget,setWidget] = React.useState('');
    
    function handleChange(e) {
        setWidget(e.target.value );
      }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // Add Widgets details
            await fetch(`/api/widgets?context=${encodedContext}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: widget,
            });
            router.push('/widgets');
            
        } catch (error) {
            console.error('Error Adding the Widget ', error);
        }
    }

    return (
        <Panel header="Create Widget" id="widgets">
             <H3>ADD Widget Schema</H3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Textarea rows={7} label="Widget Schema" placeholder="Widget Schema" name="message" onChange={handleChange}
        value={widget}/>
                    </FormGroup>
                    <Box marginTop="xxLarge">
                        <Button type="submit">Create</Button>
                    </Box>
                </Form>
        </Panel>
    );
};
export default Index;