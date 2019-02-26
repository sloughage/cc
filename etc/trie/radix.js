//node: str value, [] children, bool eow
//trie: node root, fun add, fun del, fun get, fun contains
//optimizations: children alphabetical

function Node(value){
	this.value = value;
	this.children = [];
	this.eow = false;
}

function lss(str, strarr){

}

function Trie(){
	this.root = new Node("");

	this.add = function(str){
		function addNode(n, s){
			if(s == n.value){
				n.eow = true;
			}else{
				var i = 0;
				while(s.slice(i, i + 1) == n.value.slice(i, i + 1)){i++};
				if(i != 0){
					// for(child in n.children){
					// 	addNode(child, s);
					// }
					if(i == s.length){
						var temp = new Node(n.value.slice(i));
						temp.children = n.children;
						n.value = s;
						n.children = [temp];
						n.eow = true;
					}else if(i == n.value.length){
						var bool = true;
						for(child in n.children){
							addNode(child, s.slice(i))
						}
					}
				}
			}
		}
		addNode(this.root, str);
	}


		while(s.length > 0){
			var i = 0;
			if(s == node.value){
				break;
			}else{
				while(s.slice(i, i + 1) == node.value.slice(i, i + 1)){i++};
				if(i == 0){
					skip;
				}else if(s.length == i){//split node, single child
					var n = new Node(node.value.slice(i));
					node.value = s;
					n.children = node.children;
					node.children = [n];
					break;
				}else if(node.value.length == i){//add s.slice(i)
					s = s.slice(i);

				}
			}
			i = node.children.map(function(x){return x.value.slice(0, 1)}).indexOf(s.slice(0, 1));
			if(i == -1){
				node.children.push(new Node(s));
				s = "";
				i = node.children.length - 1;
			}
			node = node.children[i];
		}
		node.eow = true;
	}


	this.add = function(str){
		var node = this.root;
		var s = str;
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.slice(0, 1));
			if(i == -1){
				node.children.push(new Node(s.slice(0, 1)));
				i = node.children.length - 1;
			}
			node = node.children[i];
			s = s.slice(1);
		}
		node.eow = true;
	}

	this.get = function(str){
		var node = this.root;
		var s = str;
		var rList = [];
		function getPaths(n, rStr){
			if(n.eow){rList.push(rStr)};
			for(child of n.children){
				getPaths(child, rStr + child.value);
			}
		}
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
			if(i == -1){
				return [];
			}else{
				node = node.children[i];
				s = s.substring(1);
			}
		}
		getPaths(node, "");
		return rList;
	}

	this.del = function(str){
		var node = this.root;
		var s = str;
		var history = [];
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
			if(i == -1){
				return false;
			}else{
				history.push(node);
				node = node.children[i];
				s = s.substring(1);
			}
		}
		node.eow = false;
		while(history.length > 1){
			if(node.children.length === 0){
				var child = node.value;
				node = history.pop();
				node.children.splice(node.children.map(function(x){return x.value}).indexOf(child), 1);
			}else{
				break;
			}
		}
		return true;
	}

	this.contains = function(str){
		var node = this.root;
		var s = str;
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
			if(i == -1){
				return false;
			}else{
				node = node.children[i];
				s = s.substring(1);
			}
		}
		return node.eow;
	}

	this.size = function(str){
		var node = this.root;
		var s = str;
		var c = 0;
		function getCount(n){
			for(child of n.children){
				// console.log(child.value);
				c++;
				getCount(child);
			}
		}
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
			if(i == -1){
				return [];
			}else{
				node = node.children[i];
				s = s.substring(1);
			}
		}
		getCount(node);
		return c;
	}
	this.length = function(str){
		var node = this.root;
		var s = str;
		var c = 0;
		function getCount(n){
			for(child of n.children){
				if(child.eow){
					c++;
				}
				getCount(child);
			}
		}
		while(s.length > 0){
			var i = node.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
			if(i == -1){
				return [];
			}else{
				node = node.children[i];
				s = s.substring(1);
			}
		}
		getCount(node);
		return c;
	}
}

var trie = new Trie();
trie.add("ant");
trie.add("a");
trie.add("anvil");
trie.add("at");
trie.add("and");
console.log(trie.get(""));
console.log(trie.size(""));
console.log(trie.length(""));
trie.del("anvil");
console.log(trie.get(""));
console.log(trie.size(""));
console.log(trie.length(""));