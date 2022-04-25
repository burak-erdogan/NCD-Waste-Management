#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$RECYCLER" ] && echo "Missing \$RECYCLER environment variable" && exit 1

echo
echo 'About to call beRecycler() on the contract'
echo 'type is Recycling Type, You can write what you want. Example : Metal Recycler, Burner, Washer etc.'
echo near call $CONTRACT beRecycler '{"name" : "$RECYCLER", "type": "mixed"}' --accountId $RECYCLER
echo 
echo \$CONTRACT is $CONTRACT
echo \$recycler is $RECYCLER
echo 
echo 'type is Recycling Type, You can write what you want. Example : Metal Recycler, Burner, Washer etc.'
echo 'type is Recycling Type, You can write what you want. Example : Metal Recycler, Burner, Washer etc.'
echo 'You can change before using script'
echo
echo
near call $CONTRACT beRecycler '{"name" : "$RECYCLER", "type": "mixed"}' --accountId $RECYCLER