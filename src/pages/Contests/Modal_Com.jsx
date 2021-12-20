import React, { useState } from 'react';
import { Modal, Button, Checkbox } from 'antd';

const Modal_comm = (props) => {
    const [visible, setVisible] = useState(false);

    const showModal = () =>{
        setVisible(true);
    }

    const handleCancel = () =>{
        setVisible(false);
    }

    return (
        <>
        <Button className='modal_diva_button' type="primary" onClick={showModal}>
          Division
        </Button>
        <Modal
          visible={visible}
          title={<b>Divisions</b>}
          width={(screen.width > 650)?550:400}
          onCancel={handleCancel}
          footer={
            <Button className='modal_set_button' type="primary" key="back" onClick={handleCancel}>
              Set
            </Button>}
        >
          {props.difflev.map((lev, i, index) => {
                  if (props.display.values[i]) {
                    return (
                      <Checkbox inline checked={true} onChange={(event) => props.change(event, i)} id={`inline-${lev}-${i}`} key={index}>{lev}</Checkbox>
                    )
                  } else {
                    return (
                      <Checkbox inline onChange={(event) => props.change(event, i)} id={`inline-${lev}-${i}`} key={index}>{lev}</Checkbox>
                    )
                  }
                })}
        </Modal>        
        </>
     );
}
 
export default Modal_comm;