import { useEffect , useState, useContext } from "react";
import { Box, Typography , styled } from "@mui/material";
import { useParams } from "react-router-dom";
import {API} from "../../service/api";
import  {Edit, Delete} from '@mui/icons-material';
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
    margin : 50px 100px;
`;

const Image = styled('img')({
    width : '100%',
    height : '50vh',
    objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight : 600;
    text-align : center;
    margin : 50px 0 10px 0;
    word-break : break-word;
`;

const EditIcon = styled(Edit)`
    margin : 5px;
    padding : 5px;
    border : 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin : 5px;
    padding : 5px;
    border : 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)`
    color : #878787;
    margin : 20px 0;
    display : flex;
`;

const Description = styled(Typography)`
    word-break : break-word;
`;

const DetailView = () => {

    const [post,setPost] = useState({});
    const { id } = useParams();
    const { account} = useContext(DataContext);

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1329&q=80";

    useEffect(() => {
        const fetchData = async () => {
           let response = await API.getPostById(id);
           if(response.isSuccess) {
                setPost(response.data);
           }
        }
        fetchData();
    },[])

    return (
        <Container>
            <Image src={url} alt="Blog"/>

            <Box style={{float : 'right'}}>
                {
                    account.Username === post.Username &&
                    <>
                        <EditIcon color="primary"/>
                        <DeleteIcon color="error"/>
                    </>
                }
                

            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author : <Box component = "span" style={{ fontWeight : 600}}>{post.Username}</Box></Typography>
                <Typography style={{ marginLeft : 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{post.description}</Description>

        </Container>
    )
}
export default DetailView;