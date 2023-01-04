/*****
 * File containing main logic to display NFA
 *
 */

width = 500;
height = 200;
radius = 25;

nfa = [nfa1, nfa2, nfa3, nfa4, nfa5];
nfaIndex = 0

inputIndex = 0
inputPointer = -1

nodes = []
edges = []

path_state = "acc";

function refreshCanvas(){
  clearElem(canvas);

  curr = ""
  if(inputPointer != -1){
    // console.log("before", inputPointer, curr);
    // console.log(nfa[nfaIndex]["input"]);
    if(path_state == "acc"){
      curr = nfa[nfaIndex]["input"][inputIndex]["states"][inputPointer];
    }else{
      curr = nfa[nfaIndex]["input"][inputIndex]["reject_path"][inputPointer];
    }
    // console.log("after", inputPointer, curr);
  }
  res = displayCanvas(canvas, nfa[nfaIndex], inputPointer, curr);

  nodes = res[0]
  edges = res[1]
}

function resetInput(){
  inputIndex = 0
  inputPointer = -1

  refreshInput();
}

function refreshInput(){
  inputContainer = document.getElementById("input_container");
  clearElem(inputContainer);
  for(let i=0;i<nfa[nfaIndex]["input"][inputIndex]["string"].length;++i){
    textColor = "black";
    if(inputPointer == i){
      textColor = "red";
    }
    span = newElement("font", [["id", "text_"+i], ["color", textColor]]);
    text = document.createTextNode(nfa[nfaIndex]["input"][inputIndex]["string"][i]);
    span.appendChild(text);
    inputContainer.appendChild(span);
  }
}

function resetStack(){
  stack = document.getElementById("stack_list");
  clearElem(stack);
}

function addToStack(str){
  stack = document.getElementById("stack_list");
  listElem = newElement("li", []);
  textNode = document.createTextNode(str);
  listElem.appendChild(textNode)
  stack.appendChild(listElem);

}

function removeFromStack(){
  stack = document.getElementById("stack_list");
  if(stack.firstChild){
    stack.removeChild(stack.lastChild);
  }
}

window.addEventListener('load', function(e){
  canvas = document.getElementById("canvas1");

  refreshInput();
  refreshCanvas();
  resetStack();

  // Event listener for changing NFA
  changeNFA = document.getElementById("change_nfa");
  changeNFA.addEventListener("click", function(e){
    clearElem(canvas);
    nfaIndex = nfaIndex + 1;
    if(nfaIndex >= nfa.length){
      nfaIndex = 0;
    }
    resetInput();
    refreshCanvas();
    resetStack();
  });

  // Event listener for changing input
  changeInput = document.getElementById("change_input");
  changeInput.addEventListener("click", function(e){
    inputIndex = inputIndex + 1;
    if(inputIndex >= nfa[nfaIndex]["input"].length){
      inputIndex = 0;
    }
    inputPointer = -1;
    refreshInput();
    refreshCanvas();
    resetStack();
  });

  // Event listener for next
  next = document.getElementById("next");
  next.addEventListener("click", function(e){
    if(inputPointer != nfa[nfaIndex]["input"][inputIndex]["string"].length){
      inputPointer = inputPointer + 1;
      refreshInput();
      refreshCanvas();
      str = "";
      if(inputPointer!=0){
        str += "read character "+nfa[nfaIndex]["input"][inputIndex]["string"][inputPointer-1];
        if(path_state=="acc"){
          str += " and moved from state "+nfa[nfaIndex]["input"][inputIndex]["states"][inputPointer-1];
          str += " to state "+nfa[nfaIndex]["input"][inputIndex]["states"][inputPointer];
        }else{
          str += " and moved from state "+nfa[nfaIndex]["input"][inputIndex]["reject_path"][inputPointer-1];
          str += " to state "+nfa[nfaIndex]["input"][inputIndex]["reject_path"][inputPointer];
        }
      }
      if(inputPointer==0){
        str += "moved to start state";
      }
      addToStack(str);

      // Display popup at end
      if(inputPointer==nfa[nfaIndex]["input"][inputIndex]["string"].length){

        computationStatus = "Rejected";

        for(itr=0;itr<nfa[nfaIndex]["vertices"].length;++itr){
          if(nfa[nfaIndex]["vertices"][itr]["text"] == curr){
            if(nfa[nfaIndex]["vertices"][itr]["type"] == "accept"){
              computationStatus = "Accepted";
            }
            break;
          }
        }
        swal("Input string was "+computationStatus);
      }
    }
  });

  // Event listener for prev
  prev = document.getElementById("prev");
  prev.addEventListener("click", function(e){
    if(inputPointer != -1){
      inputPointer = inputPointer - 1;
      refreshInput();
      refreshCanvas();
      removeFromStack();
    }
  });

  // Event linstener for switch
  path_switch = document.getElementById("path_switch");
  path_switch.addEventListener("change", function(e){
    if(path_state == "acc"){
      path_state = "rej";
    }else{
      path_state = "acc";
    }
    inputPointer = -1;
    refreshInput();
    refreshCanvas();
    resetStack();
  });

});
