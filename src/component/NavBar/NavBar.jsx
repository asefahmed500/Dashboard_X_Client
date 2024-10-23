
import { Button, Navbar } from "flowbite-react";

const NavBar = () => {




    return (
        <div>
            <Navbar fluid rounded>
                <Navbar.Brand >
                    <img src="" className="mr-3 h-6 sm:h-9" alt="" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Dashboard X</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Button>Get started</Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="/" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/about">About</Navbar.Link>
                    <Navbar.Link href="/services">Services</Navbar.Link>
                   
                    <Navbar.Link href="/contact">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
