import React, { useState } from 'react';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import { AddMovieForm } from './AddMovieForm';
import { Variables } from '../../utils/Variables';

export const AddMovieModal: React.FC<{onSubmit: any}> = ({onSubmit}) => {
  const [modalVisible, setModalVisibility] = useState(false)
  const handleSubmit = (data: any) => {
    onSubmit(data);
    setModalVisibility(!modalVisible);
  }

  return (
    <>
      <Modal
        animationOut='bounceOutDown'
        isVisible={modalVisible}
        style={{backgroundColor: Variables.bodyBackgroundColor, margin: 0}}
      >
        <AddMovieForm onSubmit={handleSubmit} setModalVisibility={setModalVisibility} />
      </Modal>

      <Icon name="md-add" size={25} onPress={() => { setModalVisibility(true); }}></Icon>
    </>
  );
}