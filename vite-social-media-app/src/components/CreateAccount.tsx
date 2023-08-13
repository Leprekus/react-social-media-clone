import React, { useState } from 'react'
import user from '../../mock/user.json'
import Layout from '../Layout';
import FormContent from './sections/FormContent';
export default function CreateAccount() {
    const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>('')
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    username: user.username,
    password: user.password,
    bio: user.bio
  });

  const totalPages = 2;

  const handleNextOrCreate = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      return
    }
    console.log({ formData })
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFormChange = (fieldName: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ totalPages, currentPage, selectedImg})
    if (currentPage === totalPages) {
      //TODO:Handle form submission
      console.log(formData);
      try {
        setIsLoading(true)
      } catch(error) {
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    } 
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target?.files) {
      
      const [ file ] = event.target.files
    
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(file);

    } 
  }
  return (
    <Layout>
      <FormContent
        currentPage={currentPage}
        formData={formData}
        selectedImg={selectedImg}
        handleFormChange={handleFormChange}
        handleImageChange={handleImageChange}
        handlePreviousPage={handlePreviousPage}
        handleNextOrCreate={handleNextOrCreate}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        totalPages={totalPages}
      />
    </Layout>
  );
}
