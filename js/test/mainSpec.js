define(['jquery', 'ZombieTranslator'], function($, ZombieTranslator){
	var translator;

	beforeEach(function(){
		translator = new ZombieTranslator();
	});
	describe('English to Zombiese', function(){
		it("should turn a final 'r' into 'rh' - Rule 1", function(){
			expect(translator.zombify("r")).toBe("rh");
			expect(translator.zombify("tqr.")).toContain("rh");
			expect(translator.zombify("the horror")).toMatch(/[a-z]+rh$/);
		});

		it("should replace 'A' and 'a' with 'hra' - Rule 2", function(){
			expect(translator.zombify("Aa")).not.toBe("Hrahra");
			expect(translator.zombify("Apple")).not.toContain("A");
			expect(translator.zombify("alpha")).not.toMatch(/pha/);
		});

		it("should begin sentences with capitol letters - Rule 3", function(){
			var d = translator.zombify("No. don't!").charAt(8);
			expect(d).toEqual("D");
			var t = translator.zombify("Surprise!  too many spaces.").charAt(22);
			expect(t).not.toEqual("T");
			var r = translator.zombify("Why? one translation per rule.").charAt(6);
			expect(r).toBeGreaterThan("R");
		});

		it("should replace 'E' and 'e' with 'rr' - Rule 4", function(){
			expect(translator.zombify("EeE e")).toEqual(translator.zombify("eEe E"));
			expect(translator.zombify("bcdefg.")).toMatch(/.+rr.+/);
			expect(translator.zombify(".E .")).toBe(".rr .");
		});

		it("should replace 'I' and 'i' with 'rrRr' - Rule 5", function(){
			expect(translator.zombify("Hi").length).toBe("hi".length + 3);
			expect(translator.zombify("I").length).not.toBeGreaterThan(translator.zombify("i").length);
			expect(translator.zombify("it's I.  i and not h-im")).not.toContain("i");
		});

		it("should replace 'O' and 'o' with 'rrrRr' - Rule 6", function(){
			expect(translator.zombify("Oh-ho").length).not.toBeLessThan(translator.zombify("tee-hee"));
			var s = "";
			for(var i = 0; Math.floor(Math.random()*1000); i++)
			{
				s += "o";
			}
			expect(translator.zombify(s).length).toBe(s.length * 5);
			expect(translator.zombify(".o'o o]o[o;o:o/o\\o\"o?o~o!o")).not.toContain("o");
		});

		it("should replace 'U' and 'u' with 'rrrrRr - Rule 7", function(){
			expect(translator.zombify("u")).toBe(translator.zombify("U"));
			expect(translator.zombify("vacuum")).toMatch(/rrrrrrrrrrrr/i);
			expect(translator.zombify("u")).toEqual(translator.zombify("ei"));
		});

		it("should repalce a non-terminal 'R' or 'r' with 'RR' - Rule 8", function(){
			expect(translator.zombify('RRf')).not.toBe("RRf");
			expect(translator.zombify("rj r~ r: r; r) r( r< r> r* r& r^ r% r$ r# r@ r- r_ r+ r=")).not.toContain("h");
			expect(translator.zombify("r@")).toEqual(translator.zombify("R@"));
		});

		it("should turn numbers into '?' - Rule 9", function(){
			expect(parseInt(translator.zombify("1234"))).toBeNaN();
			expect(translator.zombify("5556792").length).toBeLessThan(7);
			var s = "Hello719283lls; a";
			expect(translator.zombify(s)).toMatch(/[a-zA-Z]+?.*/);
		});

		it("should replace 'food' with 'BRAINS' - Rule 10", function(){
			expect(translator.zombify("fOoD")).toBe("BRAINS");
			expect(translator.zombify("welikefoodtoeat")).toMatch(/.*BRAINS.*/);
			expect(translator.zombify("fo od")).not.toContain("BRAINS");
		});

		it("should handle bogus input", function(){
			expect(translator._zombify_char("Hello", -1).translation).toBe("");
			expect(translator.zombify(undefined)).not.toBeUndefined();
			expect(translator.zombify("")).toBeDefined();
			expect(translator.zombify(null)).not.toBeNull();
		});
	});
});