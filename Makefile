yarn-install:
	$(info > Running yarn install to set up the project.)
	yarn install

yarn-build:
	$(info > Running yarn build to create artifacts)
	PUBLIC_URL=/assets yarn build:staging:external

copy-files:
	$(info > Copying files to `PDA_FE_DIR`.)
	cp    build/asset-manifest.json ${PDA_FE_DIR}
	cp    build/index.html ${PDA_FE_DIR}
	cp -r build/static/css ${PDA_FE_DIR}/static
	cp -r build/static/js  ${PDA_FE_DIR}/static
	cp -r build/static/media  ${PDA_FE_DIR}/static
	$(info > Restart your local PDA to see the changes.)
