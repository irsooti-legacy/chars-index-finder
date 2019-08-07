# Chars index finder

Do you have to find the character index of a selected text inside a container element? Begin and start? This is your library then. 

## But... Range is the native way to get end's and start's offset!

True, but if you have a very long text up to 65536 characters the DOM auto creates multiple text nodes, giving error of calculus of the offsets.

This library will count the exact indexes offsets, counting over all each text nodes.