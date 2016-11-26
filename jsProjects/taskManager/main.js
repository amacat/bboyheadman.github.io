(function(){

	var config = {
		apiKey: "AIzaSyAwKMoKj_sk6TQV-paWdgarGW8w8v8XQ1Q",
		authDomain: "nulp-93482.firebaseapp.com",
		databaseURL: "https://nulp-93482.firebaseio.com",
		storageBucket: "nulp-93482.appspot.com",
		messagingSenderId: "163026386106"
		};
	firebase.initializeApp(config);

	var items = document.getElementById('items');
	var db = firebase.database().ref().child('posts/'+username);

	db.on('value', function(posts) {
		var response = posts.val();
		items.innerHTML = '';
		Object.keys(response).reverse().map(function(objectKey, index) {
	    	var value = response[objectKey];

			var mainElem = document.createElement('div');
			var removeButton = document.createElement('button');
			var elemText = document.createElement('span');
			//Main div
			mainElem.className = 'item';
			mainElem.id = value.key;
			//remove button
			removeButton.className = 'remove-button';
			removeButton.innerText = 'X';
			removeButton.onclick = function(){ 
				removePost(this.parentNode.id); 
			};
			//content span
			elemText.className = 'content';
			elemText.innerText = value.text;

			mainElem.appendChild(elemText);
			mainElem.appendChild(removeButton);
			items.appendChild(mainElem);

		});
	});



	document.getElementById('submit').addEventListener('click', function(){

		var text = document.getElementById('textInput');
		if (text.value.length > 0) {
			writeNewPost(text.value);
			text.value = "";
		} else {
			alert("Заповніть форму!");
		}

	});


	function writeNewPost(title) {
		// Get a key for a new Post.
		var newPostKey = firebase.database().ref().child('posts/'+username).push().key;

		var postData = {
			text: title,
			key: newPostKey
		};
		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/posts/'+username+'/' + newPostKey] = postData;

		return firebase.database().ref().update(updates);
	}

	function removePost (postId) {
		// firebase.database().ref().child("posts/"+postId).remove();
		firebase.database().ref().child("posts/"+username+"/"+postId).remove();
	}



}());