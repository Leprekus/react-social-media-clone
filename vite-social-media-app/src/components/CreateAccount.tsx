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
    password: user.password,
    username: user.username,
    bio: user.bio,
    profileImage: selectedImg
  });

  const totalPages = 2;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      return
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFormChange = (fieldName: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ totalPages, currentPage, selectedImg})
    if (currentPage === totalPages) {
      //TODO:Handle form submission
      
      try {
        setIsLoading(true)
        setFormData((prev) => ({
          ...prev,
          profileImage: selectedImg
        }))
        const res = await fetch(`${import.meta.env['VITE_BACKEND_URL']}api/POST/create-account`, {
          method: 'POST',
          headers:{ 'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })

        const data = await res.json()
        console.log({ data })
      
       
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
        handleNextPage={handleNextPage}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        totalPages={totalPages}
      />
    </Layout>
  );
}
