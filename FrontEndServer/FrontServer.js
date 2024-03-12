const express = require('express');
const axois = require('axios');
const app = express();
const path = require("path");
var bodyParser = require('body-parser');
const { default: axios } = require('axios');

const base_url = "http://localhost:3000";

app.set("views" ,path.join(__dirname, "/public/view"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/" , async(req ,res) => {
    res.render("PetProduct/login.ejs");
});

app.get("/main", async (req, res) => {
    res.render("PetProduct/main.ejs");
});

app.get("/cats", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats');
        res.render("PetProduct/viewall", {cats: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});


app.get("/cat/view/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats/' + req.params.id);
        res.render("PetProduct/view", { cat: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cat/create", (req, res) => {
    res.render("PetProduct/create");
});

app.post("/create", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
                    color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.post(base_url + '/cats/', data);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cat/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/cats/' + req.params.id);
        res.render("PetProduct/update", { cat: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/update/:id", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
            color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.put(base_url + '/cats/' + req.params.id, data);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/cats/' + req.params.id);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

//Customer Table
app.get("/customers/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers');
        res.render("Customer/customers", {customers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/customer/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers/' + req.params.id);
        res.render("Customer/customer", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/create", (req, res) => {
    res.render("Customer/create");
});

app.post("/customers/create", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.post(base_url + '/customers/', customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/customers/' + req.params.id);
        res.render("Customer/update", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/customers/update/:id", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.put(base_url + '/customers/' + req.params.id, customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/customers/' + req.params.id);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

//Order Table
app.get("/orders/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/orders');
        res.render("Order/orders", {orders: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/order/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/orders/' + req.params.id);
        res.render("Order/order", { order: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orders/create", (req, res) => {
    res.render("Order/create");
});

app.post("/orders/create", async (req, res) => {
    try{
        const orderData = {customer_id: req.body.customer_id, order_date: req.body.order_date, total_amount: req.body.total_amount};
        await axios.post(base_url + '/orders/', orderData);
        res.redirect("/orders/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orders/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/orders/' + req.params.id);
        res.render("Order/update", { order: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/orders/update/:id", async (req, res) => {
    try{
        const orderData = {customer_id: req.body.customer_id, order_date: req.body.order_date, total_amount: req.body.total_amount};
        await axios.put(base_url + '/orders/' + req.params.id, orderData);
        res.redirect("/orders/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orders/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/orders/' + req.params.id);
        res.redirect("/orders/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});


//OrderDetails Table
app.get("/orderdetails/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/orderDetails');
        res.render("Orderdetails/orderdetails", {orderDetails: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/orderdetail/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/orderDetails/' + req.params.id);
        res.render("OrderDetails/orderdetail", { orderDetail: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orderdetails/create", (req, res) => {
    res.render("OrderDetails/create");
});

app.post("/orderdetails/create", async (req, res) => {
    try{
        const detailData = {order_id: req.body.order_id, cat_id: req.body.cat_id,
                    quantity: req.body.quantity, unitPrice: req.body.unitPrice};
        await axios.post(base_url + '/orderdetails/', detailData);
        res.redirect("/orderdetails/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orderdetails/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/orderdetails/' + req.params.id);
        res.render("OrderDetails/update", { orderDetail: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/orderdetails/update/:id", async (req, res) => {
    try{
        const detailData = {order_id: req.body.order_id, cat_id: req.body.cat_id,
            quantity: req.body.quantity, unitPrice: req.body.unitPrice};
        await axios.put(base_url + '/orderdetails/' + req.params.id, detailData);
        res.redirect("/orderdetails/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/orderdetails/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/orderdetails/' + req.params.id);
        res.redirect("/orderdetails/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

//Petcustomer Table
app.get("/petcustomers", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/petcustomers');
        const catRes = await axios.get(base_url + '/cats');
        const customerRes = await axios.get(base_url + '/customers');
        res.render("petcustomer/Petcustomer", {
            petcustomers: response.data ,
            cats: catRes.data ,
            customers: customerRes.data
        });
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/petcustomer/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/petcustomers/' + req.params.id);
        res.render("petcustomer/petcustomer", { petcustomers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/create", (req, res) => {
    res.render("petcustomer/create");
});

app.post("/petcustomers/create", async (req, res) => {
    try{
        const customer_All = {cat_id: req.body.cat_id ,customer_id: req.body.customer_id};
        await axios.post(base_url + "/petcustomers", customer_All);
        res.redirect("/petcustomers");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/update/:id", async (req, res) => {
    try{
        const response = await axois.get(
        base_url + '/petcustomer/' + req.params.petcustomer_id);
        res.render("Petcustomer/update", { petcustomers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/petcustomers/update/:id", async (req, res) => {
    try{
        const detailData = {cat_id: req.body.cat_id ,customer_id: req.body.customer_id};
        await axios.put(base_url + '/petcustomer/' + req.params.petcustomer_id, detailData);
        res.redirect("/petcustomer/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/delete/:id", async (req, res) => {
    try{
        const petcusId = req.params.petcustomer_id;
        await axios.delete(base_url + '/petcustomer/' + petcusId);
        res.redirect("/petcustomer/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});