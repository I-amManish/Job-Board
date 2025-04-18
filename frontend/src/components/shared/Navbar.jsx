import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = false;
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#f83002]">Portal</span>
                    </h1>
                </div>

                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">Jobs</li>
                        <li className="cursor-pointer">Browse</li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login" ><Button variant="outline" className="">Login</Button></Link>

                                <Link to="/signup" ><Button className="bg-[#6a38c2] hover:bg-[#5b39a6]">Signup</Button></Link>
                                
                            </div>
                        ) :
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>

                                        <div>
                                            <h4 className='font-medium'>Manish Kumar</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col  my2 text-gray-600'>
                                        <div className='flex items-center gap-2 cursor-pointer w-fit'>
                                            <User2 />
                                            <Button variant="link" className='text-sm'>View Profile</Button>
                                        </div>
                                        <div className='flex items-center gap-2 cursor-pointer w-fit'>
                                            <LogOut />
                                            <Button variant="link" className='text-sm'>Logout</Button>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;
