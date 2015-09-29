require(['jquery', 'ZombieTranslator'], function($, ZombieTranslator){
  $(document).ready(function(){

    var translator = new ZombieTranslator();

    $('#english').on("keyup", function(){
      var text = $('#english').val();
      var translation = translator.zombify(text);
      $('#zombie').val(translation);
    });
    $('#zombie').click(function(){
      var text = $('#zombie').val();
      var translation = translator.unzombify(text);
      $('#english').val(translation);
    });

  });  
})

