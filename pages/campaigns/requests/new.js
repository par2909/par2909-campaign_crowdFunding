import React, { Component } from 'react';
import {Form,Button,Message, Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from "../../../routes";
import Layout from '../../../components/Layout';
import campaign from '../../../ethereum/campaign';

class RequestNew extends Component{
    state={
        value:'',
        description:'',
        recipient:'',
        errMessage:'',
        loading:false
    };
    static async getInitialProps(props){
        const {address}=props.query;
        return {address};
    }
onSubmit=async event=>{
    event.preventDefault();

    const campaign=Campaign(this.props.address);
    const {description,value,recipient}=this.state;

    this.setState({loading:true,errMessage:''});
    try {
        const accounts=await web3.eth.getAccounts();
        await campaign.methods
                        .createRequest(description,web3.utils.toWei(value,'ether'),recipient)
                        .send({from:accounts[0] });
        Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (error) {
        this.setState({errMessage:error.message});
    }
    this.setState({loading:false});
}

    render(){
        return(
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}><a><Button primary>BACK</Button></a></Link>
                <h3>Create a New Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input value={this.props.description}
                        onChange={event=>this.setState({description:event.target.value})} />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input value={this.props.value}
                        onChange={event=>this.setState({value:event.target.value})} />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient Address</label>
                        <Input value={this.props.recipient}
                        onChange={event=>this.setState({recipient:event.target.value})} />
                    </Form.Field>
                    <Message error header="OOPS!" content={this.state.errMessage}/>
                    <Button primary error loading={this.state.loading} >CREATE !</Button>
                </Form>
            </Layout>
        )}
}
export default RequestNew;