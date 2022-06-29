import React, { Component } from 'react'
import { Card,Grid,Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeFrom from '../../components/ContributeForm';
import {Link} from '../../routes';
 class CampaignShow extends Component {
    static async getInitialProps(props)
    {
       const campaign=Campaign(props.query.address);//query is used ur URL components to accesss
       const summary= await campaign.methods.getSummary().call();

       return{
                address:props.query.address,
                minimumContribution:summary[0],
                balance:summary[1],
                requestCount:summary[2],
                approversCount:summary[3],
                 manager:summary[4]
             };
    }
    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        }=this.props;
        const items=[
            {
                header:manager,
                meta:'Address of Manager',
                description:'The manager created this campaign and can create request to withdraw money',
                style:{overflowWrap: 'break-word'}
            },
            {
                header:minimumContribution,
                meta:'Minimum Contribution (WEI)',
                description:'You must contribute this much wei to become an approver',
                style:{overflowWrap: 'break-word'}
            },
            {
                header:requestCount,
                meta:'Number of Request',
                description:'A request tries to withdraw money from the Contract.request must be approve by approvers.',
                style:{overflowWrap: 'break-word'}
            },
            {
                header:approversCount,
                meta:'Numbers of Approves Granted',
                description:'Number of people who have already donated to campaign.',
                style:{overflowWrap: 'break-word'}
            },
            {
                header:web3.utils.fromWei(balance,'ether') ,
                meta:'Campaign Balance (Ether)',
                description:'The Balance  is how much money this campaign as left to spent.',
                style:{overflowWrap: 'break-word'}
            }

        ];
        return <Card.Group items={items}/>
    }
  render() {
    return (
      <Layout>
       <h1><b>Campaign    Details</b></h1>
       <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                {this.renderCards()}
                </Grid.Column>
                <Grid.Column width={6}><ContributeFrom address={this.props.address} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a><Button primary>View Requests</Button></a>
                    </Link>
                </Grid.Column>
            </Grid.Row>
       </Grid>
      </Layout>

    )
  }
}
export default CampaignShow;