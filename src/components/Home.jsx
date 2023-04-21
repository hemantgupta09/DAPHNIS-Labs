import React, { useEffect, useState } from "react";
import "./Home.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/js/dist/modal';
import '../../node_modules/bootstrap/js/dist/collapse'
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import axios from "axios";
import ReadMoreReact from 'read-more-react';
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import { store } from "./Store";

const Home = () => {
    let Navigate = useNavigate()
    console.log(store.getState().user);
    let [state, setstate] = useState([]);
    let [cat, setcat] = useState([]);
    useEffect(() => {
        async function showall() {
            let res = await axios.get(`https://fakestoreapi.com/products/`)
            setstate(res.data)
        }
        showall()
    }, [])
    const category = async () => {
        let res = await axios.get(`https://fakestoreapi.com/products/categories/`)
        setcat(res.data);
    }
    category();
    const data = [
        { name: "men's clothing", counts: state.filter((v) => { return v.category === "men's clothing" }).length },
        { name: "jewelery", counts: state.filter((v) => { return v.category === "jewelery" }).length },
        { name: "electronics", counts: state.filter((v) => { return v.category === "electronics" }).length },
        { name: "women's clothing", counts: state.filter((v) => { return v.category === "women's clothing" }).length },
    ];
    return (
        <div className="container-fluid bg-dark">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container text-center pt-sm-4 pb-sm-4">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button onClick={() => {
                                    Navigate('/Login')
                                }} className="btn btn-danger fs-5">Login or sign up</button>
                            </li>
                        </ul>
                        <select className='form-select container fs-5' style={{ width: "30%" }} onChange={(e) => {
                            if (e.target.value === "show all") {
                                const products = async () => {
                                    let res = await axios.get(`https://fakestoreapi.com/products/`)
                                    setstate(res.data);
                                }
                                products()
                            }
                            else {
                                const showone = async () => {
                                    let res = await axios.get(`https://fakestoreapi.com/products/`)
                                    setstate(res.data.filter((v) => {
                                        return v.category === e.target.value;
                                    }))
                                }
                                showone()
                            }
                        }}>
                            <option hidden >select by category</option>
                            <option>show all</option>
                            {cat.map((v, i) => {
                                return (
                                    <option key={i}>{v}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </nav>
            <div className="row row-cols-1 row-cols-md-4 g-5 bg-dark">
                {state.map((v) => {
                    return (
                        <>
                            <div className="col">
                                <div className="card container bg-light rounded-5">
                                    <img src={v.image} className="card-img-top rounded-4" alt="noimg" />
                                    <div className="card-body">
                                        <h5 className="card-title">{v.title}</h5>
                                        <h6 className="text-secondary">{v.category}</h6>
                                        <h4 className="text-bg-warning rounded-5 text-center">INR {v.price}</h4>
                                        <ReactStars
                                            value={v.rating.rate}
                                            count={5}
                                            edit={false}
                                            size={24}
                                            color2={'#ffd700'} /><span className="fw-bolder text-dark">{v.rating.rate}</span>
                                        {v.rating.count < 200 ? <h5 className="text-danger">{v.rating.count} units left hurry !</h5> : <h5 className="text-dark">{v.rating.count} units</h5>}
                                        <ReadMoreReact
                                            text={v.description}
                                            min={100}
                                            max={150}
                                            readMoreText={<p className="text-primary" style={{ cursor: "pointer" }}>Read More</p>}
                                            color2={"#ffd700"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            <button class="btn-fixed fixed-btn" data-bs-target="#exampleModal" data-bs-toggle="modal">
                Analize ? <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content shadow-lg">
                        <div className="modal-header bg-info">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Product Analisys</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-light">
                            <div>
                                <PieChart width={300} height={250} className="ms-sm-5">
                                    <Pie dataKey="counts" isAnimationActive={false} data={data} cx={120} cy={120} outerRadius={100} fill="#8884d8" label />
                                    <Tooltip />
                                </PieChart>
                                <BarChart width={450} height={300} data={data} margin={{ top: 5, right: 30, bottom: 5, }} barSize={20} >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 5, right: 10 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="counts" fill="#8884d8" background={{ fill: "#eef" }} />
                                </BarChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;