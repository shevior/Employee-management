import React from 'react';
import Header from './Header';
import { FaUsers, FaTasks, FaChartBar } from 'react-icons/fa';

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <h1>Welcome to the Employee Management System!</h1>
                <p>
                    Here you can manage your employees efficiently and effectively.
                </p>
                <div className="features">
                    <div className="feature">
                        {/* <FaUsers className="icon" /> */}
                        <h2>Employee Management</h2>
                        <p>Manage all your employees' information in one place. Edit, add, or remove employees effortlessly.</p>
                    </div>
                    <div className="feature">
                        {/* <FaTasks className="icon" /> */}
                        <h2>Role Assignment</h2>
                        <p>Assign roles and responsibilities to your employees with precision.</p>
                    </div>
                    <div className="feature">
                        {/* <FaChartBar className="icon" /> */}
                        <h2>Performance Analytics</h2>
                        <p>Analyze employee performance with intuitive charts.</p>
                    </div>
                </div>
                <p>Experience the Future of Employee Management</p>
                <p>
                    Unlock the full potential of your workforce with our innovative employee management platform. Join thousands of businesses worldwide who rely on our solution to streamline HR processes and drive organizational success.
                </p>
                <p>Ready to elevate your employee management experience? Get started today!</p>
            </div>
        </div>
    );
};

export default Home;
