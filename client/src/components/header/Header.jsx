import { AppBar, Toolbar, Typography , styled} from "@mui/material";
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background-color : #000;
    color : #FFFFFF;
`

const Content = styled(Toolbar) `
    justify-content : center;
    & > a {
        padding : 20px;
        color : #FFFFFF;
        text-decoration : none;
    }
`

const Header = () => {
    return (
        <Component>
            <Content>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Content>
        </Component>
        // <div>Hello from Header</div>
    )
}

export default Header;