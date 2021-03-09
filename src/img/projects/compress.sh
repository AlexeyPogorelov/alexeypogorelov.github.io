rm -r compressed
mkdir compressed
cp *.png ./compressed/
cd compressed
mogrify -resize 650x^ -gravity North -extent 650x650 -format jpg *.png
rm *.png
find -type f -iname "*.jpg" -exec jpegoptim --strip-all --all-progressive -pm25 {} \;

