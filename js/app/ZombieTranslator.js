define(['jquery'], function($){
	var ZombieTranslator = function(){};

		ZombieTranslator.prototype.zombify = function(text){
	      // 1. lower-case "r" at the end of words replaced with "rh".
	      // 2. an "a" or "A" by itself will be replaced with "hra".
	      // 3. the starts of sentences are capitalised (the "start of a sentence" is any occurrence of
	      //   ".!?", followed by a space, followed by a letter.)
	      // 4. "e" or "E" is replaced by "rr"
	      // 5. "i" or "I" is replaced by "rrRr"
	      // 6. "o" or "O" is replaced by "rrrRr"
	      // 7. "u" or "U" is replaced by "rrrrRr"
	      // 8. "r" or "R' is replaced by "RR"
	      var translation = "";
	      if(text === null || typeof text === "undefined")
	      {
	      	return "undefined";
	      }
	      for(var i = 0; i < text.length; i++)
	      {
	        var result = this._zombify_char(text, i);
	        i += result.skip;
	        translation += result.translation;   
	      }
	      return translation;
	    }

	    ZombieTranslator.prototype.unzombify = function(text){
	      var translation = "";
	      if(text === null || typeof text === "undefined")
	      {
	      	return "undefined";
	      }
	      for(var i = 0; i < text.length; i++)
	      {
	        var result = this._unzombify_char(text, i);
	        i += result.skip;
	        translation += result.translation;
	      }
	      return translation;
	    }

	    ZombieTranslator.prototype._zombify_char = function(text, i){
	      // regular expressions
	      var letter = /[a-zA-z]/;
	      var end_punct = /[.?'"!]/;
	      var end_of_word = new RegExp(/[.?'"!\s]/);
	      var last_letter = new RegExp(/[a-zA-Z]$/);
	      var number = /\d/;

	      if(i < 0 || text === null || typeof text === undefined)
	      {
	      	return{
	      		skip: text.length,
	      		translation: ""
	      	};
	      }

	      var ch = text.charAt(i);
	      var skip = 0;
	      var tran = "";
	      var text = text;

	      // Rule 3
	      if(end_punct.test(ch))
	      {
	        if(text.charAt(++i) == " " && letter.test(text.charAt(++i)))
	        {
	          tran += ch+" ";
	          ch = text.charAt(i).toUpperCase();
	          skip += 2;
	        }
	      }

	      // Rule 9 - Zombies can't count.
	      if(number.test(ch))
	      {
	        tran = "?";
	        while(number.test(text.charAt(++i)))
	        {
	          skip++;
	        }
	      }

	      else if(ch == "r" || ch == "R")
	      {
	        // Rule 1
	        if(ch == "r" && (end_of_word.test(text.charAt(++i)) || text.length == i))
	        {
	        	tran += "rh" + text.charAt(i);
	      		skip++;
	        }  
	        // Rule 8
	        else
	          tran += "RR";
	      }

	      // Rule 2
	      else if(ch == "a" || ch == "A")
	        tran += "hra";

	      // Rule 4
	      else if(ch == "e" || ch == "E")
	        tran += "rr";

	      // Rule 5
	      else if(ch == "i" || ch == "I")
	        tran += "rrRr";

	      // Rule 6
	      else if(ch == "o" || ch == "O")
	        tran += "rrrRr";

	      // Rule 7
	      else if(ch == "u" || ch == "U")
	        tran += "rrrrRr";

	      // Rule 10 - BRAINS! 
	      else if(ch == "f" || ch == "F")
	      {
	        if(text.charAt(++i) == "o" || text.charAt(i) == "O")
	        {
	          if(text.charAt(++i) == "o" || text.charAt(i) == "O")
	          {
	            if(text.charAt(++i) == "d" || text.charAt(i) == "D")
	            {
	              tran += "BRAINS";
	              skip = 3;
	            }
	            else 
	            	tran += ch;
	          }
	          else 
	          	tran += ch;
	        }
	        else tran += ch;
	      }

	      else 
	        tran += ch;
	      return {
	        skip: skip,
	        translation: tran
	      };
	    };

		ZombieTranslator.prototype._unzombify_char = function(text, i){
	      var ch = text.charAt(i);
	      var skip = 0;
	      var tran = "";
	      var lookahead = 0;

	      if(i < 0 || text === null || typeof text === undefined)
	      {
	      	return{
	      		skip: text.length,
	      		translation: ""
	      	};
	      }

	      if(ch == "B")
	      {
	      	tran = "B";
	      	lookahead++;
	      	if(text.charAt(i + lookahead) == "R")
	      	{
	      		lookahead++;
	      		if(text.charAt(i + lookahead) == "A")
	      		{
	      			lookahead++;
	      			if(text.charAt(i + lookahead) == "I")
	      			{
	      				lookahead++;
	      				if(text.charAt(i + lookahead) == "N")
	      				{
	      					lookahead++;
	      					if(text.charAt(i + lookahead) == "S")
	      					{
	      						tran = "food";
	      						skip = lookahead;
	      					}
	      				}
	      			}
	      		}
	      	}
	      }

	      else if(ch == "R")
	      {
	        if(text.charAt(++i) == "R")
	        {
	          tran = "r";
	          skip++;
	        }
	        else 
	        	tran = "R";
	      }

	      else if(ch == "r")
	      {
	      	tran = ch;
	        // Level 2 r_
	        lookahead++;
	        if(text.charAt(i + lookahead) == "h") // rh
	        {
	          tran = "r";
	          skip = lookahead;
	        }

	        // Level 2 r_
	        else if(text.charAt(i + lookahead) == "r") // rr
	        {
	          skip = lookahead;
	          tran = "e";
	          // Level 3 rr_
	          lookahead++;
	          if(text.charAt(i + lookahead) == "R") // rrR
	          {
	            // Level 4 rrR_
	            lookahead++;
	            if(text.charAt(i + lookahead) == "r") // rrRr
	            {
	              tran = "i";
	              skip = lookahead;
	            }
	            // Level 4 rrR_
	            else if(text.charAt(i + lookahead) != "R") // rrRR
	            {
	              tran = "*error*";
	              skip = lookahead;
	            }
	            else 
	            {
	              tran = "er";
	              skip = lookahead;
	            }
	          }
	          // Level 3 rr_
	          else if(text.charAt(i + lookahead) == "r") // rrr
	          {
	            // Level 4 rrr_
	            lookahead++;
	            if(text.charAt(i + lookahead) == "R") // rrrR
	            {
	              lookahead++;
	              // Level 5 rrrR_
	              if(text.charAt(i + lookahead) != "r") // rrrRr
	              {
	                tran = "*error*";
	                skip = lookahead;
	              }
	              else 
	              {
	                tran = "o";
	                skip = lookahead;
	              }
	            }
	            // Level 4 rrr_
	            else if(text.charAt(i + lookahead) == "r") // rrrr
	            {
	              lookahead++;
	              // Level 5 rrrr_
	              if(text.charAt(i + lookahead) == "R") // rrrrR
	              {
	                lookahead++;
	                // Level 6 rrrrR_
	                if(text.charAt(i + lookahead) != "r") // rrrrRr
	                {
	                  tran = "*error*";
	                  skip = lookahead;
	                }
	                else 
	                {
	                  tran = "u";
	                  skip = lookahead;
	                } // Level 6 rrrrR_
	              } // Level 5 rrrr_
	            } // Level 4 rrr_
	          } // Level 3 rr_
	          // else 
	          // {
	          //   tran = "e";
	          //   skip = 1;
	          // }
	        } // Level 2 r_
	      }

	      else if(ch == "h")
	      {
	        tran = ch;
	        lookahead++;
	        if(text.charAt(i + lookahead) == "r")
	        {
	          lookahead++;
	          if(text.charAt(i + lookahead) == "a")
	          {
	            tran = "a";
	            skip = lookahead;
	          }
	        }
	      }
	      else 
	        tran = ch;

	      return{
	        skip: skip,
	        translation: tran
	      };
	    }

	return ZombieTranslator;
});