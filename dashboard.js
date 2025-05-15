const contractAddress = "0x5649954fd55d8w874"; // Fake address, use actual
const abi = [
  "function vote(uint _candidate) public",
  "function getVotes() public view returns (uint[] memory)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("Wallet connected");
  } else {
    alert("Install MetaMask");
  }
}

async function castVote() {
  const candidate = document.getElementById("candidate").value;
  try {
    await contract.vote(candidate);
    alert("Vote cast successfully!");
    loadResults();
  } catch (err) {
    alert("Voting failed: " + err.message);
  }
}

async function loadResults() {
  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";

  try {
    const votes = await contract.getVotes();
    const candidates = ["Alice", "Bob", "Charlie"];
    votes.forEach((count, index) => {
      const item = document.createElement("li");
      item.className = "list-group-item";
      item.textContent = `${candidates[index]}: ${count} vote(s)`;
      resultsList.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading results:", err);
  }
}

window.onload = async () => {
  await connectWallet();
  await loadResults();
};
