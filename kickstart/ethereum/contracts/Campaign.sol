// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public { // Pass the minimum argument to the Campaign constructor
        Campaign newCampaign = new Campaign(minimum, msg.sender); // create a new contract Campaign
        deployedCampaigns.push(address(newCampaign)); 
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign { // we define the type Campaign but we have not instatiated a variable
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount; // how many contributers we have

    modifier restricted() {
        require(msg.sender == manager); // only the manager of the contract can call the function this modifier is applied to
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator; // the creator address will be the manager
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution); // In order to contribute you must call this function with an amount of Ether greater than minimContribution
        approvers[msg.sender] = true; // add the address that is contributing to the approvers
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public  restricted {
        requests.push();
        Request storage request = requests[requests.length -1];
        request.description = description;
        request.value = value;
        request.recipient = recipient;
        request.complete = false;
        request.approvalCount = 0;
    }

    function approveRequest(uint index) public { // index of the Request[]
        require(approvers[msg.sender]); // make sure the address is a donator
        Request storage request = requests[index]; // storage because we want to modify the instance variabile
        require(!request.approvals[msg.sender]); // make sure that the address has not voted before

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted { // the index of the Request[]
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2)); // make sure that the person who voted yes are more than 50% of the contributors
        require(!request.complete);
        request.recipient.transfer(request.value); // sends the money to the recipient
        request.complete = true;
    }

    function getRequest(uint index) public view returns (string memory) {
        Request storage request = requests[index];
        return (
            request.description
            );
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}