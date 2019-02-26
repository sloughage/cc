//node: str value, [] children, bool eow
//trie: node root, fun add, fun del, fun get, fun contains
//optimizations: children alphabetical

function Node(value){
	this.value = value;
	this.children = [];
	this.eow = false;
}

function Trie(){
	this.root = new Node("");

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

	this.getD = function(str, c){
		var rList = [];
		function getPaths(n, rStr){
			if(n.eow){rList.push(rStr)};
			for(child of n.children){
				getPaths(child, rStr + child.value);
			}
		}
		function findPaths(n, s, k){
			console.log("findPaths: " + n.value + " " + s + " " + k)
			if(s == ""){
				console.log("getPaths: " + n.value)
				getPaths(n, "");
			}
			else{
				if(k > 0){
					console.log("k > 0")
					var i = n.children.map(function(x){return x.value}).indexOf(s.substring(1, 2));
					console.log("stuck on i")
					if(i != -1){
						console.log("deeper: " + n.children[i].value);
						findPaths(n.children[i], s.substring(2), k - 1);
					}
				}
				var i = n.children.map(function(x){return x.value}).indexOf(s.substring(0, 1));
				if(i != -1){
					console.log("deeper: " + n.children[i].value + ", " + s.substring(1) + ", " + k)
					findPaths(n.children[i], s.substring(1), k);
				}
			}
		}
		findPaths(this.root, str, c);
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
// console.log(trie.get(""));
// console.log(trie.size(""));
// console.log(trie.length(""));
// trie.del("and");
// console.log(trie.get(""));
// console.log(trie.size(""));
// console.log(trie.length(""));
console.log(trie.getD("ant", 1));