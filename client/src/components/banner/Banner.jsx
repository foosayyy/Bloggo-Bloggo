
import { Box , Typography ,styled } from "@mui/material";

const Image = styled(Box)`
    background : url(https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg) center/55%;
    width : 100%;
    height: 50vh;
    display : flex;
    align-items: center;
    justify-content: center;
    flex-direction : column;
`;

const Heading = styled(Typography)`
    font-size : 70px;
    color : #000;
    line-height : 1;
`;

const SubHeading = styled(Typography)`
    font-size : 20px;
    background : #FFFFFF;
`

const Banner = () => {
    return (
        <Image>
            <Heading>Travel-Diary</Heading>
            <SubHeading>Personalise Travel Experience</SubHeading>
        </Image>
    )
}
export default Banner;