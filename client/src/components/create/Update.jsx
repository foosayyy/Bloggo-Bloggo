import { useState, useEffect, useContext } from "react";


import { Box, styled , FormControl, InputBase, Button , TextareaAutosize} from "@mui/material";
import {AddCircle as Add} from '@mui/icons-material';

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../service/api";

const Container = styled(Box) (({theme}) => ({
    margin : '50px 100px',
    [theme.breakpoints.down('md')] : {
        margin : 0
    }

}));

const PostBanner = styled('img')({
    width : '100%',
    height : '60vh',
    objectFit : 'cover'
});

const StyledFormControl = styled (FormControl)`
    margin-top : 10px;
    display :flex;
    flex-direction : row;
`;

const InputTextField = styled (InputBase)`
    flex: 1;
    margin : 0 30px;
    font-size: 25px;
`;
const StyledButton = styled(Button)`
    background : #000;
    color: #FFF;
`;

const Textarea = styled (TextareaAutosize)`
    width : 100%;
    margin-top : 50px;
    font-size : 18px;
    border : none;
    &:focus-visible { 
        outline : none;
    }
`;

const initialPost = {
    title : '',
    description : '',
    picture : '',
    Username: '',
    categories:'',
    createdDate: new Date()
}

const Update = () => {

    const [post, setPost] = useState(initialPost);
    const [file,setFile] =useState('');
    
    const {account} = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    useEffect(() => {
        const getImage = async() => {
            if(file) {
                const data = new FormData();
                data.append("name" , file.name);
                data.append("file",file);

                //API Call
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.Username = account.Username;
    }, [file])

    const url = post.picture ? post.picture : 'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg';

    const updateBlogPost = async() =>  {
        let response = await API.updatePost(post);

        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }

    return (
        <Container>
            <PostBanner src={url} alt="PostBanner"/>


            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input 
                    type="file"
                    id="fileInput"
                    style={{display : 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextField placeholder="Title" value={post.title} onChange={(e) => handleChange(e)} name='title'/>
                <StyledButton variant="contained" onClick={() => updateBlogPost()}>Update</StyledButton>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder="Share your experience...."
                onChange={(e) => handleChange(e)}
                name='description'
                value={post.description}
            />
        </Container>
    )
}
export default Update;