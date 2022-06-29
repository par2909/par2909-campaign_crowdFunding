import React, { Component } from 'react';
import { Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from "../ethereum/factory";
import {Link} from '../routes';



class CampaignIndex extends Component {
    static async getInitialProps(){ //this method get attached to class rather than class instance and gets called automatically at start 
        const campaigns =await factory.methods.getDeployedCampaigns().call();
        return{campaigns};
    }
    renderCampaign(){
        const item=this.props.campaigns.map(address=>{
            return{
            header:address,
            description:(<Link route={`/campaigns/${address}`}><a>View Campaigns</a></Link>),
            fluid:true};
        });

        return <Card.Group items={item} />;
    }
    render() {
        return (
        <div >
            <Layout>
                <h3>Open Campaigns</h3>
                <div>
                <br/>
                <Link route='/campaigns/new'><a>
                    <Button floated='right' content="Create Campaign" icon="add circle" primary /></a></Link>
                    {this.renderCampaign()}
                </div>
            </Layout>
        </div>
        );
    }
}

export default CampaignIndex;